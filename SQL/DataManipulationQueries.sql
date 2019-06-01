-- Group 8: Andres Arizala, Daniel Gonzalez, Christopher Hughes, Cole Jones
-- Date: 31 May 2019

-- These are preliminary SQL queries drafted for Group 8's HW6 implementation assignment

-- READ Functionality

--1)
-- Grab all facilities matching a user-input zip code
SELECT facilities.name, categories.name, facilities.zip, facilities.address, facilities.phone
  FROM facilities
  INNER JOIN categories ON facilities.categoryid = categories.id
  WHERE facilities.zip = form.inZIP

--2)
-- Grab all facilities matching a user-input category
SELECT facilities.name, categories.name, facilities.zip, facilities.address, facilities.phone
  FROM facilities
  INNER JOIN categories ON facilities.categoryid = categories.id
  WHERE facilities.categoryid = form.inCategory

--3)
-- Grab all facilities matching user-input zip code AND category
SELECT facilities.name, categories.name, facilities.zip, facilities.address, facilities.phone
  FROM facilities
  INNER JOIN categories ON facilities.categoryid = categories.id
  WHERE facilities.categoryid = form.inCategory AND facilities.zip = form.inZIP


--CREATE ENDPOINTS

--4)
-- Add new facility to DB
INSERT INTO facilities (id, name, categoryid, zip, address, phone) VALUES (NULL, ?, ?, ?, ?, ?);

--5)
-- Add new user account to DB
INSERT INTO users (id, email, password, firstname, lastname, phone) VALUES (NULL, ?, ?, ?, ?, ?);