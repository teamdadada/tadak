import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from save_to_db import is_product_name_exists

def get_product_details(url):
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    driver.get(url)
    time.sleep(1)

    soup = BeautifulSoup(driver.page_source, "html.parser")

    # 상품명 추출
    name_tag = soup.select_one("meta[property='og:title']")
    if name_tag and name_tag.has_attr('content'):
        raw_name = name_tag['content'].strip()
        name = raw_name.replace("[다나와] ", "", 1) if raw_name.startswith("[다나와] ") else raw_name
    else:
        name = None

    if name and is_product_name_exists(name):
        driver.quit()
        return None

    # 가격 추출
    price_tag = soup.select_one("span.lwst_prc > em.prc_c")
    min_price = price_tag.text.strip().replace(",", "") if price_tag else None

    # 썸네일
    thumb_tag = soup.select_one("div.thumb_area img#baseImage")
    thumbnail = "https:" + thumb_tag["src"] if thumb_tag and thumb_tag.has_attr("src") else None

    # 상세 이미지
    detail_img_tag = soup.select_one("div#detail_export div.inner img")
    detail_image = detail_img_tag["src"] if detail_img_tag and detail_img_tag.has_attr("src") else None

    # 스펙 테이블
    spec_table = soup.select_one("div#productDescriptionArea div.prod_spec table.spec_tbl")
    if not spec_table:
        driver.quit()
        return {"url": url, "error": "스펙 테이블 없음"}

    specs = {}
    for row in spec_table.select("tbody > tr"):
        ths = row.select("th.tit")
        tds = row.select("td.dsc")
        if len(ths) == 2 and len(tds) == 2:
            specs[ths[0].text.strip()] = tds[0].text.strip()
            specs[ths[1].text.strip()] = tds[1].text.strip()

    features = []
    feature_keys = ["매크로 기능", "숫자키없음", "비키스타일", "RGB 백라이트", "금속하우징", "스위치 교체형", "흡음재", "착탈식 케이블"]
    for key in feature_keys:
        if key in specs:
            features.append(specs[key] if specs[key] != "○" else key)

    driver.quit()

    result = {
        "name": name,
        "manufacturer": specs.get("제조회사"),
        "release_date": specs.get("등록년월"),
        "size": specs.get("사이즈"),
        "connection_type": specs.get("연결 방식"),
        "contact_type": specs.get("접점 방식"),
        "key_layout": specs.get("키 배열"),
        "interface": specs.get("인터페이스"),
        "features": features or None,
        "thumbnail": thumbnail,
        "detail_image": detail_image,
        "min_price": min_price,
        "url": url
    }

    # None 값 제거
    return {k: v for k, v in result.items() if v}
