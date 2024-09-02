# Creating Dashboard for Slow query in kibana
# Extracting ns,command, durationMillis from the message field
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



