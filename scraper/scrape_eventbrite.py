import requests
from datetime import datetime

BACKEND_URL = "http://localhost:5000/api/events/upsert"

fake_events = [
    {
        "title": "Sydney Jazz Night",
        "source": "Eventbrite",
        "sourceUrl": "https://eventbrite.com/jazz-night",
        "city": "Sydney",
        "lastScrapedAt": datetime.utcnow().isoformat()
    },
    {
        "title": "Tech Meetup Sydney",
        "source": "Meetup",
        "sourceUrl": "https://meetup.com/tech-sydney",
        "city": "Sydney",
        "lastScrapedAt": datetime.utcnow().isoformat()
    }
]

for event in fake_events:
    r = requests.post(BACKEND_URL, json=event)
    print("Inserted:", event["title"], r.status_code)
