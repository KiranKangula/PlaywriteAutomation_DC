Feature: Worker Travel Portal

Background: Launch to Worker Travel Portal
  Given User is on landing page

  @SheetName_WT @WT
  Scenario: Submit Worker Travel application and verify if it is landed in GWCC.
    Given User is on landing page
    When User enters claimant information such as "<claimnumber>", "<lastname>", "<dateofbirth>"
    Then Enter data in Travel Expense screen
    Then Enter data in Other Expenses screen
    Then User should be able to review and Submit the application
    Then Switch to New tab and Login to ClaimCenter
    Then Search for "<claimnumber>"
    Then Verify the document is landed in GWCC with valid Author and Description
