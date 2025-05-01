import pymysql
from pymongo import MongoClient

# RDB 연결 설정
def get_rdb_connection():
    return pymysql.connect(
        host='localhost',
        user='ssafy12th',
        password='ssafy12th',
        db='data_pipeline',
        charset='utf8mb4'
    )

# 중복 체크
def is_product_name_exists(product_type, product_name):
    conn = get_rdb_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                "SELECT product_id FROM products WHERE product_type = %s AND product_name = %s",
                (product_type, product_name,)
            )
            return cursor.fetchone() is not None
    finally:
        conn.close()

# MongoDB 연결 설정
def get_mongo_connection():
    mongo = MongoClient("mongodb://localhost:27017/")
    return mongo["danawa"]

# RDB 저장 함수
def save_to_rdb(product_name):
    conn = get_rdb_connection()
    product_id = None
    try:
        with conn.cursor() as cursor:
            # 삽입 또는 업데이트
            sql = """
            INSERT INTO products (product_type, product_name, created_at, updated_at)
            VALUES ('BAREBONE', %s, NOW(), NOW())
            ON DUPLICATE KEY UPDATE updated_at = NOW()
            """
            cursor.execute(sql, (product_name,))
            conn.commit()

            # 현재 product_id 조회
            cursor.execute("SELECT product_id FROM products WHERE product_name = %s", (product_name,))
            result = cursor.fetchone()
            product_id = result[0] if result else None
    finally:
        conn.close()
    return product_id

# MongoDB 저장 함수
def save_to_mongodb(product_id, product_detail):
    db = get_mongo_connection()
    collection = db["barebone_specs"]

    # 중복 확인
    if collection.find_one({"product_id": product_id}):
        # print(f"MongoDB 이미 존재: product_id {product_id}, 저장 생략")
        return

    # None 또는 "정보 없음" 필드는 제거
    clean_detail = {
        k: v for k, v in product_detail.items()
        if v is not None and v != "정보 없음"
    }
    clean_detail["product_id"] = product_id

    collection.insert_one(clean_detail)

# 전체 저장 함수
def save_products(final_result):
    for product in final_result:
        try:
            product_name = product.get("name")
            if not product_name:
                # print("상품명 누락: 저장 생략")
                continue

            product_id = save_to_rdb(product_name)

            product_detail = {
                "manufacturer": product.get("manufacturer"),
                "release_date": product.get("release_date"),
                "size": product.get("size"),
                "connection_type": product.get("connection_type"),
                "contact_type": product.get("contact_type"),
                "key_layout": product.get("key_layout"),
                "interface": product.get("interface"),
                "features": product.get("features"),
                "thumbnail": product.get("thumbnail"),
                "detail_image": product.get("detail_image"),
                "min_price": product.get("min_price"),
                "url": product.get("url")
            }

            save_to_mongodb(product_id, product_detail)
            # print(f"저장 완료: {product_name} (product_id: {product_id})")

        except Exception as e:
            # print(f"저장 중 오류 발생: {e}")
            continue
