// tests/step_definitions/B2BForm7.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from './world';
import { XMLParser } from 'fast-xml-parser';

let apiEndpoint = '';
let requestPayload = '';
let responseStatus = 0;
let responseBodyText = '';

Given('the API Token endpoint is configured with {string}', async function (this: CustomWorld, endpoint: string) {
  const baseUrl = this.config?.AuthHandler || 'http://daixap12:36600';
  apiEndpoint = `${baseUrl}${endpoint}`;
});

When('the token request body has set up', async function (this: CustomWorld) {
  const userId = this.config?.UserId || 'Kiran_Kangula@wsib.on.ca';
  const password = this.config?.Password || 'Welcome1';

  requestPayload = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:auth="http://wsib.on.ca/b2bf7/auth">
      <soapenv:Header/>
      <soapenv:Body>
        <auth:authenticateUser>
          <auth:username>${userId}</auth:username>
          <auth:password>${password}</auth:password>
        </auth:authenticateUser>
      </soapenv:Body>
    </soapenv:Envelope>
  `.trim();
});

When('a Token POST request is sent', async function (this: CustomWorld) {
  const response = await this.request!.post(apiEndpoint, {
    headers: { 'Content-Type': 'text/xml;charset=UTF-8' },
    data: requestPayload
  });
  responseStatus = response.status();
  responseBodyText = await response.text();
});

Then('the response status code should be {int}', async function (this: CustomWorld, statusCode: number) {
  expect(responseStatus).toBe(statusCode);
});

Then('Capture the token value from response', async function (this: CustomWorld) {
  const parser = new XMLParser({ ignoreAttributes: false });
  const jsonObj = parser.parse(responseBodyText);
  const token =
    jsonObj?.['soapenv:Envelope']?.['soapenv:Body']?.['auth:authenticateUserResponse']?.['auth:token'] ||
    jsonObj?.Envelope?.Body?.authenticateUserResponse?.token;

  expect(token).toBeDefined();
  this.authToken = token;
});

Given('the API endpoint is configured with {string}', async function (this: CustomWorld, endpoint: string) {
  const baseUrl = this.config?.baseUrl || 'https://sit2.ospc.wsib.ca';
  apiEndpoint = `${baseUrl}${endpoint}`;
});

Given('the request body is configured', async function (this: CustomWorld) {
  const accNum = this.currentRow?.['accountNumber'] || '3978262';
  const dob = this.currentRow?.['dateOfBirth'] || '01011990';
  const fn = this.currentRow?.['First Name'] || 'TestFirst';
  const ln = this.currentRow?.['Last Name'] || 'TestLast';

  requestPayload = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sub="http://wsib.on.ca/b2bf7/submit">
      <soapenv:Header>
        <sub:token>${this.authToken}</sub:token>
      </soapenv:Header>
      <soapenv:Body>
        <sub:submitClaim>
          <sub:accountNumber>${accNum}</sub:accountNumber>
          <sub:claimant>
            <sub:firstName>${fn}</sub:firstName>
            <sub:lastName>${ln}</sub:lastName>
            <sub:dateOfBirth>${dob}</sub:dateOfBirth>
          </sub:claimant>
        </sub:submitClaim>
      </soapenv:Body>
    </soapenv:Envelope>
  `.trim();
});

When('a POST request is sent with XML body', async function (this: CustomWorld) {
  const response = await this.request!.post(apiEndpoint, {
    headers: { 'Content-Type': 'text/xml;charset=UTF-8' },
    data: requestPayload
  });
  responseStatus = response.status();
  responseBodyText = await response.text();
});

Then('the response status code and confirmation number should be validated', async function (this: CustomWorld) {
  expect(responseStatus).toBe(200);
  const parser = new XMLParser();
  const jsonObj = parser.parse(responseBodyText);
  expect(jsonObj).toBeDefined();
});