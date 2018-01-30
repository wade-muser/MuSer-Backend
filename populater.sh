#!/bin/bash

while IFS= read line
do
	trimmed_line=$(echo -n $line | sed 's/^ *//;s/ *$//')
	echo "Started for " $trimmed_line
	echo "$trimmed_line" | 
		  xargs node ./services/commons/muser_populater.js
	echo "Sleeping 10s ..."
	sleep 10
	echo "Finished ##################" "$line" "\n"
done < "$1"


