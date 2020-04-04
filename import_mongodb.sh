#!/bin/bash 
mongoimport --jsonArray --uri mongodb://127.0.0.1/anima --collection user exports_user.json 
