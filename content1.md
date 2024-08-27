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
  Order=Descending and size=100
  Custom label=Api
  ```
7. Now Add Sub-bucket and click on Split rows
8. Configure Sub-bucket
  ```
  Sub-aggregation=Terms
  Field=response_time_in_ms
  Order by=Custom metric, Aggregation=Max, Field=response_time_in_ms
  Order=Descendig, size=1
  Custom_label=Max_Response_Time_In_Ms
  ```
9. Click on save, give a ```title=Table_Of_Api_Response_Times_In_Ms``` and add it to the visualize library.

Table is created successfully

### Graph creation
1. Go to visualize library from the menu
2. Click on Create visualization and select Aggregation based
3. Select Data table as visualization type
4. Select application* index pattern
5. On the right-hand side, you can see the Data tab. Under it in the Metrics Y-axis is present. Configure it
  ```
  Aggregation=Max
  Field=response_time_in_ms
  Custom label=Max_Response_Time_In_Ms
  ```
6. Click on Add bucket and click on X-axis, configure it
  ```
  Aggregation=Terms
  Field=url.keyword
  Order by=Metric:Max_Reponse_time_In_Ms
  Order=Descending, size=100
  Custom label=Api
  ```
7.  On the right-hand side, Beside Data tab there is another tab called Metrics and axes. Select it and configure as:
```
X-axis position=Left
Under labels disable the Show labels button. 
```
8.  Click on Update button below.
9.  Click on Save, give it ```title=Graph_Of_Api_Max_Response_Time_In_Ms```. Add it to the visualize library.

Graph is created successfully

## Dashboard creation
1. Go to Dashboard from menu
2. Click on Create dashboard
3. Click on Add visualization
4. Select the created table view and graph view from the visualize library
5. And Click on save ```title=Api_Max_Response_Time_Dashboard```
Dashboard is created successfully

Time range can be set in the dashboard itself







