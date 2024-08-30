# Creating Dashboard in kibana


Index pattern application* has ResponseTimeInMs field as text type. But we need to convert it into the number type field.

Use runtime fields to convert ResponseTimeInMs field to number type.

## Create Runtime field
1. Go to menu and click on Stack Management under Management
2. Under kibana select the Index patterns
3. Select the application* index pattern
4. Click on Add field button to add a runtime field
5. Give the field a
   ```
   name=response_time_in_ms
   type=long
   value=(in define script space add the below code)
   ```
   ```
   //Code to Convert to long type by removing numbers after point and rounding it to the nearest number.
    if (doc['ResponseTimeInMs.keyword'].size() > 0) {
      try {
          // Convert to double explicitly using `Double.parseDouble`
          def textValue = doc['ResponseTimeInMs.keyword'].value;
          def doubleValue = Double.parseDouble(textValue);
        
         
          emit(Math.round( doubleValue));
      } catch (Exception e) {
          // Emit NaN in case of error
          emit((long)Double.NaN);
      }
    } else {
      // Emit NaN if the field is missing
      emit((long)Double.NaN);
    }
   ```
6. Click on save

Runtime field is created successfully. Now response_time_in_ms is an number type(Long) to use.


## Creating Visualizations
### Table creation
1. Go to visualize library from the menu
2. Click on Create visualization and select Aggregation based
3. Select Data table as visualization type
4. Select application* index pattern
5. On the right-hand side, you can see Data tab. Under it select Add buckets.
6. Configuring the bucket
  ```
  Aggregation=Terms
  Field=url.keyword
  Order by=Custom metric, Aggregation=Max, Field=response_time_in_ms
  Order=Descending and size=2147483647
  Custom label=Api
  ```
7. Now Add Sub-bucket and click on Split rows
8. Configure Sub-bucket
  ```
  Sub-aggregation=Terms
  Field=response_time_in_ms
  Order by=Custom metric, Aggregation=Max, Field=response_time_in_ms
  Order=Descending, size=1
  Custom_label=Max_Response_Time_In_Ms
  ```
9. Now Add another Sub-bucket and click on Split rows(This sub-bucket is for timestamp)
10. Configure Sub-bucket
```
Sub aggregation=Terms
Field=@timestamp
Order by=Custom metric,Aggregation=Max,Field=response_time_in_ms
Order=Descending,Size=1
Custom label=@timestamp
```
11. Now Add another Sub-bucket and click on Split rows(This sub-bucket is for instance name)
12. Configure it
```
Sub aggregation=Terms
Field=instance.keyword
Order by=Custom metric,Aggregation=Max,Field=response_time_in_ms
Order=Descending,Size=1
Custom label=Service name
```
13. Click on save, give a ```title=Table_Of_Api_Response_Times_In_Ms``` and add it to the visualize library.

Table is created successfully

### Graph creation
1. Go to visualize library from the menu
2. Click on Create visualization and select Aggregation based
3. Select line graph as visualization type
4. Select application* index pattern
5. On the right-hand side, you can see the Data tab. Under it in the Metrics Y-axis is present. Configure it
  ```
  Aggregation=Top Hit
  Field=response_time_in_ms
  Aggregate with=Concatenate, Size=1
  Sort on=@timestamp, Order=Descending
  Custom label=response_time_in_ms
  ```
6. Click on Add bucket and click on X-axis, configure it
  ```
  Aggregation=Date Histogram
  Field=@timestamp
  Min Interval=1ms(we can change it to seconds or minutes, eventhough we selected the 1ms it get auto-scaled if no. of buckets in thaat time increases)
  ```
7. Click on Add bucket and click on Split series, configure it
```
Sub aggregation=Terms
Field=url.keyword
Order by=Custom metric,Aggregation=Max,Field=@timestamp
Order=Descending, Size=2147483647
Custom label=Api
```
8.  On the right-hand side, Beside Data tab there is another tab called Panel Settings. Select it and configure as:
```
Legend Position=Right
On the visualization, on the bottom Right corner, there is menu type icon. It is used to toggle the appearance of the url details on right of the visualization.
```
8.  Click on Update button below.
9. Now the line graph visualization is being created. But to change the type of the chart, go to Metrics and axes tab. Under Metrics section, in the Chart type change the value to Bar. Click on Update. Now the visualization is changed to the bar graph stacked structure. 
10.  Click on Save, give it ```title=Graph_Of_Api_Response_Times_Over_Time```. Add it to the visualize library.

Graph is created successfully

## Dashboard creation
1. Go to Dashboard from menu
2. Click on Create dashboard
3. Click on Add visualization
4. Select the created table view and graph view from the visualize library
5. And Click on save ```title=Api_Response_Time_Dashboard```
Dashboard is created successfully

Time range can be set in the dashboard itself







