from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta
import json
import os

from danawa_crawler.href_collector import collect_product_hrefs
from danawa_crawler.detail_scraper import get_product_details
from danawa_crawler.save_to_db import save_products

DATA_PATH = "/opt/airflow/data/danawa_hrefs.json"
URL = "https://prod.danawa.com/list/?cate=11454264"

default_args = {
    'owner': 'ssafy',
    'retries': 1,
    'retry_delay': timedelta(minutes=1),
}

def collect_and_save_hrefs():
    hrefs = collect_product_hrefs(limit=300, max_page =10, url=URL)
    os.makedirs(os.path.dirname(DATA_PATH), exist_ok=True)
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(hrefs, f, ensure_ascii=False)

def crawl_and_store_from_hrefs():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        hrefs = json.load(f)

    results = []
    for href in hrefs:
        detail = get_product_details(href)
        if detail:  # 중복일 경우 None이거나 빈 dict
            results.append(detail)

    if results:
        save_products(results)

with DAG(
    dag_id='danawa_href_crawl_pipeline',
    default_args=default_args,
    start_date=datetime(2024, 4, 1),
    schedule_interval='@daily',
    catchup=False,
    tags=['danawa', 'crawler', 'step-split'],
) as dag:

    collect_hrefs_task = PythonOperator(
        task_id='collect_hrefs',
        python_callable=collect_and_save_hrefs
    )

    crawl_and_save_task = PythonOperator(
        task_id='crawl_and_save',
        python_callable=crawl_and_store_from_hrefs
    )

    collect_hrefs_task >> crawl_and_save_task
