import requests
import os

def get_news(query):
    # 실제 구현 시에는 Google News RSS나 NewsAPI를 사용합니다.
    # 여기서는 테스트를 위해 슬랙으로 전송할 메시지 포맷을 만듭니다.
    message = f"📢 *[인도 시장 경쟁사 동향]* \n\n"
    companies = ["Samsung India", "Haier India", "Voltas"]
    
    for company in companies:
        message += f"🔹 *{company}* 관련 최신 뉴스 검색 결과가 업데이트되었습니다.\n"
    
    message += "\n🔗 *상세 내용 확인:* <https://news.google.com/search?q=India+Home+Appliances|구글 뉴스 바로가기>"
    return message

def send_to_slack(text):
    webhook_url = os.environ.get('SLACK_WEBHOOK_URL')
    payload = {"text": text}
    requests.post(webhook_url, json=payload)

if __name__ == "__main__":
    news_content = get_news("India Home Appliances")
    send_to_slack(news_content)
