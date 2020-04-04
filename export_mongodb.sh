#!/bin/bash 
mongoexport --jsonArray --uri mongodb://127.0.0.1/anima --collection user --out exports_user.json 
