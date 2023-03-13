public with sharing class MasterController {
//This method returns the all object from org
@AuraEnabled(cacheable=true)
public static Map<String,String> getObject() {
try {
    Map<String,String> objectMap = new Map<String,String>();
    for(Schema.SObjectType obj : Schema.getGlobalDescribe().values()){
    String name = obj.getDescribe().getLocalName();
    String label = obj.getDescribe().getLabel();
    objectMap.put(name, label);
    }
    return objectMap;
} catch (Exception e) {
    throw new AuraHandledException(e.getMessage());
}
}

//this method accept the selected Object and return all the fields
@AuraEnabled(cacheable=true)
public static Map<String,String> getFields(String selectedObjName){
try {
    Map<String,String> fieldMap = new Map<String,String>();
    Map<String,Schema.sObjectType> globalDescribe = Schema.getGlobalDescribe();
    
    for(Schema.SObjectField fieldName : globalDescribe.get(selectedObjName).getDescribe().fields.getMap().values()){
        fieldMap.put(fieldName.getDescribe().getName(),fieldName.getDescribe().getName());
        }       
        return fieldMap;     
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
}

//This method accept the object Name and list of fields and return list of sObjects
@AuraEnabled(cacheable=true)
public static List<SObject> recordsFetch(string objname,List<String> fields){
    try {
        List<sObject> records = new List<sObject>();
        System.debug(objName);
        System.debug('field names');
        for(String fieldGet : fields){
            System.debug(fieldGet);
        }
        System.debug(fields);
            //List<String> fieldNames = (List<String>) JSON.deserialize(field, List<String>.class);

        if (fields != null && !fields.isEmpty()) {
            String soql = 'SELECT ';
            for (String field : fields) {
                soql += field + ',';
            }
            soql = soql.removeEnd(',');
            soql += ' FROM ' + objName;
            records = Database.query(soql);
        }
        System.debug('records');
        for(sObject record :records){
            System.debug(record);
        }
        return records;
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
}
}