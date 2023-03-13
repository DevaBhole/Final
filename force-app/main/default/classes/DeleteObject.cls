public with sharing class DeleteObject {
//This method accept the id from record as string and delete that record
@AuraEnabled
public static void deleteRecord(String objId){
    try {
            Database.delete(objId);
        }
    catch(Exception ex) {
        throw new AuraHandledException(ex.getMessage());
    }
}
}