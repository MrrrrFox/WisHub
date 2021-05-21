from .set_up import TestSetUp
from ..models import Subject
from rest_framework import status
import json

class TestSubjectCases(TestSetUp):

    def test_subject_post(self):

        old_num_domains = Subject.objects.count()
        response = self.client.post(
            f"/api/v1/wishub/subjects/",
            data={
                "title": "Maths",
                "domain": self.domain.id
            }
            )
        
        received_content = json.loads(response.content)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Subject.objects.count(), old_num_domains + 1)
        self.assertEqual(received_content["domain"], self.domain.id)
        

    def test_subject_get(self):

        response = self.client.get("/api/v1/wishub/subjects/")
        domains_received = len(json.loads(response.content))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Subject.objects.count(), domains_received)
