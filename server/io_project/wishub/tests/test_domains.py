from .set_up import TestSetUp
from ..models import Domain
from rest_framework import status
import json

class TestDomains(TestSetUp):

    def test_domain_post(self):

        old_num_domains = Domain.objects.count()
        response = self.client.post(
            f"/api/v1/wishub/domains/",
            data={
                "title": "Maths"
            }
            )
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Domain.objects.count(), old_num_domains + 1)
        

    def test_domain_get(self):

        response = self.client.get("/api/v1/wishub/domains/")
        domains_received = len(json.loads(response.content))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Domain.objects.count(), domains_received)
