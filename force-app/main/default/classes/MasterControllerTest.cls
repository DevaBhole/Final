@isTest
public with sharing class MasterControllerTest {
@isTest
public static void testGetObject() {
// Test 1: Verify the map is not empty
Map<String,String> objectMap = MasterController.getObject();
System.assertNotEquals(0, objectMap.size());

// Test 2: Verify the map contains the expected objects
List<String> expectedObjects = new List<String>{'Lead', 'Case','Opportunity'};
for (String obj : expectedObjects) {
    System.assert(objectMap.containsKey(obj));
}
}

@isTest
public static void testGetFields() {
// Test data
String selectedObjName = 'case';

// Instantiate the class and call the method to be tested
Map<String,String> fieldMap = MasterController.getFields(selectedObjName);

// Assert that the returned map is not empty
System.assertNotEquals(fieldMap.size(), 0);

// Assert that the returned map contains the expected key-value pairs
System.assertEquals(fieldMap.get('CaseNumber'), 'CaseNumber');
}

@IsTest
public static void testRecordsFetch(){
// Create a test record
Contact objContact = new Contact(lastname='Test Contact');
insert objContact;

// Create a list of fields to query
List<String> fields = new List<String>{'Id', 'Name'};

// Call the method to be tested 
List<SObject> records = MasterController.recordsFetch('Contact', fields);

System.assertEquals(1, records.size(), 'Expected 1 record');
System.assertEquals(objContact.Id, records[0].get('Id'), 'Expected Id to match');
}
}