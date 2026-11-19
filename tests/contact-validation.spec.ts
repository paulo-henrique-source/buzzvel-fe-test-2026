import { expect, test } from '@playwright/test';
import { getContactValues, submitContact, validateContact } from '@/src/lib/contact';

const validValues = {
  name: 'Alex Morgan',
  email: 'alex@example.com',
  message: 'I would like to learn more about this course.',
};

test('normalizes surrounding whitespace before validation', () => {
  const data = new FormData();
  data.set('name', '  Alex Morgan  ');
  data.set('email', ' alex@example.com ');
  data.set('message', `  ${validValues.message}  `);
  expect(getContactValues(data)).toEqual(validValues);
});

test('rejects missing and whitespace-only contact details', () => {
  expect(validateContact({ name: '  ', email: '', message: '          ' })).toEqual({
    name: expect.any(String),
    email: expect.any(String),
    message: expect.any(String),
  });
});

test('accepts names without imposing a two-word or Latin-only rule', () => {
  expect(validateContact({ ...validValues, name: '李明' })).toEqual({});
  expect(validateContact({ ...validValues, name: 'Alex' })).toEqual({});
});

test('rejects malformed email addresses and messages outside the bounds', () => {
  expect(validateContact({ ...validValues, email: 'alex@', message: 'Short' })).toMatchObject({
    email: expect.any(String),
    message: expect.any(String),
  });
  expect(validateContact({ ...validValues, message: 'a'.repeat(2001) })).toHaveProperty('message');
  expect(validateContact({ ...validValues, name: 'a'.repeat(101) })).toHaveProperty('name');
});

test('the mock submission also rejects invalid payloads', async () => {
  await expect(submitContact({ ...validValues, email: 'invalid' })).rejects.toThrow(
    'Invalid contact details.',
  );
});
