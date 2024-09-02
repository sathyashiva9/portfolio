# Creating Dashboard for Slow query in kibana

## Extracting ns,command, durationMillis from the message field
The message field in the log contains the attr object. And this attr object contains ns, command, durationMillis. To retrieve them use the json processor in filebeat.

Configuring the filebeat service so that we get the ns, command, durationMillis fields in kibana. Add this code at the end in the ```/etc/filebeat/filebeat.yml``` file.
```
processors:
#  - add_host_metadata: ~
#  - add_cloud_metadata: ~

  - decode_json_fields:
      fields: ["message"]
      process_array: false
      max_depth: 1
      target: ""
      overwrite_keys: false
      add_error_key: true

  - script:
      lang: javascript
      id: "flatten-command"
      source: >
        function process(event) {
          var command = event.Get("attr.command");
          event.Put("command", JSON.stringify(command));
        }
```

Now save it and restart the service.
```
sudo systemctl restart filebeat.service
```

To check if there are any errors in the logs after restarting the filebeat.service
```
journalctl -u filebeat.service -n 20 -f
```

## Creating table in kibana

1. Go to visualize library from the menu
2. Click on Create visualization and select Aggregation based
3. Select Data table as visualization type
4. Select filebeat* index pattern
5. On the right-hand side, you can see Data tab. Under it select Add buckets.
6. Configuring the bucket
  ```
  Aggregation=Terms
  Field=command
  Order by=Custom metric, Aggregation=Max, Field=attr.durationMillis
  Order=Descending and size=2147483647
  Custom label=slow query command
  ```
7. Now Add Sub-bucket and click on Split rows
8. Configure Sub-bucket
  ```
  Sub-aggregation=Terms
  Field=attr.durationMillis
  Order by=Custom metric, Aggregation=Max, Field=attr.durationMillis
  Order=Descending, size=1
  Custom_label=durationMillis
  ```
9. Now Add another Sub-bucket and click on Split rows(This sub-bucket is for timestamp)
10. Configure Sub-bucket
```
Sub aggregation=Terms
Field=@timestamp
Order by=Custom metric,Aggregation=Max,Field=attr.durationMillis
Order=Descending,Size=1
Custom label=@timestamp
```
11. Now Add another Sub-bucket and click on Split rows(This sub-bucket is for instance name)
12. Configure it
```
Sub aggregation=Terms
Field=attr.ns
Order by=Custom metric,Aggregation=Max,Field=attr.durationMillis
Order=Descending,Size=1
Custom label=ns
```
13. Click on save, give a ```title=Table_Of_Slow_Query_Duration``` and add it to the visualize library.

Table is created successfully

## Dashboard creation
1. Go to Dashboard from menu
2. Click on Create dashboard
3. Click on Add visualization
4. Select the created table view from the visualize library
5. And Click on save ```title=Slow_Query_Duration_Dashboard```
Dashboard is created successfully

Time range can be set in the dashboard itself
