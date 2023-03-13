@isTest
public with sharing class DeleteObjectTest {
   @TestSetup
   static void createSobject(){
    List<Account> lstAccount = new List<Account>();
    for(Integer index = 1; index <= 20; index++){
        Account objAccount = new Account();
        objAccount.Name = 'Test Account' + index;
        objAccount.BillingCity = 'City' + index;
        objAccount.BillingCountry = 'Country' + index;
        objAccount.BillingPostalCode = '1234' + index;
        objAccount.BillingState = 'State' + index;
        objAccount.BillingStreet = 'Street' + index;
        objAccount.AnnualRevenue = 700000;
        objAccount.Phone = '8786858483';
        lstAccount.add(objAccount);
   }
}
}