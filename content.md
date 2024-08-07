# Linux Commands
### Linux administration
Processes, Environment Variables, Aliases Setting
Network related and DNS  and related
### Security
SSH and related 
Permissions and users

### Cleanup linux system
diskspace cleanup
logs unnecessary cleanup

## Process
To list all processes 
```Linux
top
```
Press P (uppercase) while top is running.
This will sort the processes by their CPU usage, showing the most CPU-intensive processes at the top.

Press M (uppercase) while top is running.
This will sort the processes by their memory usage, displaying the processes using the most memory at the top.

To identify pid of a process using port number
```Linux
lsof -i :3000
```
To kill a process using PID
```Linux
kill -9 <PID>
```

## References
[https://www.digitalocean.com/community/tutorials/process-management-in-linux](https://www.digitalocean.com/community/tutorials/process-management-in-linux)
## File Handling
[https://www.digitalocean.com/community/tutorials/linux-commands#the-ln-command-in-linux](https://www.digitalocean.com/community/tutorials/linux-commands#the-ln-command-in-linux)
