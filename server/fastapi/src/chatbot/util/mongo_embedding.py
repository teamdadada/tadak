import json
from pathlib import Path
from langchain_core.documents import Document
from src.chatbot.util import embedding_util  # 기존 청크 + 임베딩 함수 사용

def load_json_documents_from_data(data: list, category: str) -> list[Document]:
    docs = []
    for item in data:
        name = item["name"]
        manufacturer = item.get("manufacturer", "")
        year = item.get("release_year", "")
        month = item.get("release_month", "")
        price = item.get("min_price", "")

        if category == "switch":
            quantity = item.get("quantity", "")
            text = f"{name}는 {manufacturer}의 스위치이며, {quantity} 구성이고 {year}년 {month}월 출시되었어요."
        elif category == "keycap":
            material = item.get("keycap_material", "")
            key_count = item.get("key_count", "")
            text = f"{name}는 {material} 재질의 키캡이며, {key_count} 구성이고 {year}년 {month}월 출시되었어요."
        elif category == "barebone":
            size = item.get("size", "")
            contact_type = item.get("contact_type", "")
            features = ", ".join(item.get("features", []))
            text = f"{name}는 {manufacturer}에서 만든 {size} 크기의 {contact_type} 베어본으로, 주요 기능은 {features} 등이 있어요."
        else:
            text = f"{name} 제품에 대한 정보입니다."

        doc = Document(
            page_content=text,
            metadata={
                "name": name,
                "min_price": price,
                "thumbnail": item.get("thumbnail"),
                "url": item.get("url"),
                "category": category,
                "file_name": f"{category}_{name}"
            }
        )
        docs.append(doc)
    embedding_util.embed_documents(docs)

    return docs
