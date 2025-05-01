import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

def collect_product_hrefs(limit, max_page, url):
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(service=service, options=options)
    driver.get(url)
    time.sleep(2)

    hrefs = []
    current_page = 1

    while current_page <= max_page:
        soup = BeautifulSoup(driver.page_source, "html.parser")
        products = soup.select("div.main_prodlist.main_prodlist_list > ul > li.prod_item.prod_layer")

        for item in products:
            tag = item.select_one("p.prod_name a")
            if tag and tag.has_attr("href"):
                hrefs.append(tag['href'])
                if len(hrefs) >= limit:
                    driver.quit()
                    return hrefs

        # 다음 페이지 클릭
        try:
            page_nav = driver.find_elements(By.CSS_SELECTOR, "div.num_nav_wrap a.num")
            for nav in page_nav:
                if nav.text.strip() == str(current_page + 1):
                    nav.click()
                    time.sleep(2)
                    current_page += 1
                    break
            else:
                break  # 다음 페이지 없음
        except Exception as e:
            print(f"[페이지 이동 오류] {e}")
            break

    driver.quit()
    return hrefs
