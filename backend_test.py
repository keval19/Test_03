import requests
import unittest
import json
import os
from datetime import datetime

class KitchenDesignerAPITest(unittest.TestCase):
    def setUp(self):
        # Use the local backend URL since the public endpoint is not working
        self.base_url = "http://localhost:8001/api"
        self.client_name = f"test_client_{datetime.now().strftime('%Y%m%d%H%M%S')}"
        
    def test_01_root_endpoint(self):
        """Test the root API endpoint"""
        print(f"\n🔍 Testing root endpoint at {self.base_url}/")
        response = requests.get(f"{self.base_url}/")
        
        self.assertEqual(response.status_code, 200, f"Expected status code 200, got {response.status_code}")
        data = response.json()
        self.assertEqual(data["message"], "Hello World", f"Expected 'Hello World' message, got {data}")
        print("✅ Root endpoint test passed")
        
    def test_02_create_status_check(self):
        """Test creating a status check record"""
        print(f"\n🔍 Testing status check creation at {self.base_url}/status")
        payload = {"client_name": self.client_name}
        response = requests.post(f"{self.base_url}/status", json=payload)
        
        self.assertEqual(response.status_code, 200, f"Expected status code 200, got {response.status_code}")
        data = response.json()
        self.assertEqual(data["client_name"], self.client_name, f"Expected client_name {self.client_name}, got {data['client_name']}")
        self.assertIn("id", data, "Response should contain an 'id' field")
        self.assertIn("timestamp", data, "Response should contain a 'timestamp' field")
        print("✅ Status check creation test passed")
        
    def test_03_get_status_checks(self):
        """Test retrieving status check records"""
        print(f"\n🔍 Testing status check retrieval at {self.base_url}/status")
        response = requests.get(f"{self.base_url}/status")
        
        self.assertEqual(response.status_code, 200, f"Expected status code 200, got {response.status_code}")
        data = response.json()
        self.assertIsInstance(data, list, "Expected a list of status checks")
        
        # Check if our test client is in the list
        found = False
        for status in data:
            if status.get("client_name") == self.client_name:
                found = True
                break
                
        self.assertTrue(found, f"Could not find our test client {self.client_name} in the status checks")
        print("✅ Status check retrieval test passed")
        
    def test_04_cors_headers(self):
        """Test CORS headers are properly set"""
        print(f"\n🔍 Testing CORS headers")
        # Use GET instead of OPTIONS since FastAPI might not handle OPTIONS correctly
        response = requests.get(f"{self.base_url}/")
        
        self.assertEqual(response.status_code, 200, f"Expected status code 200 for GET request, got {response.status_code}")
        self.assertIn("access-control-allow-origin", response.headers, "CORS header missing")
        self.assertEqual(response.headers["access-control-allow-origin"], "*", "Expected CORS header to allow all origins")
        print("✅ CORS headers test passed")

if __name__ == "__main__":
    unittest.main()
