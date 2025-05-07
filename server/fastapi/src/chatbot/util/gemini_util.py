from langchain_google_genai import ChatGoogleGenerativeAI
import google.generativeai as genai
import os
from dotenv import load_dotenv

# todo: solar 모델로 교체
load_dotenv()

# model_name = "meta-llama/Llama-3.1-8B-Instruct"
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

genai.configure(api_key=GOOGLE_API_KEY)

# for m in genai.list_models():
#   if 'generateContent' in m.supported_generation_methods:
#     print(m.name)

# model = genai.GenerativeModel('gemini-2.0-flash')
model = ChatGoogleGenerativeAI(model="gemini-2.0-flash")

# def generate_response(prompt: str):
#     response = model.generate_content(prompt,
#             generation_config={
#             "max_output_tokens": 200
#         })
#     return response.candidates[0].content.parts[0].text
