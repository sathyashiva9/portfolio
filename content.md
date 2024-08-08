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

## Commands
* nslookup
* tmux
* df -hT
* du -sh
* top
* ps
* lsblk
* ssh, and scp
* And regarding storage disk management, networking related(ip addr, netstat,traceroute,etc), emptying unwanted data to free up space like logs deletion.
* vi and nano editors
* Creating partitions and mounting them filesystem concepts and commands
CPU and Memory utilization statistics commands and commands to optimize them, ,
* File searching commands, find , grep,sed,awk,regex

* Security related commands in linux

  
## Process
To list all processes 
```Linux
top
```
Press P (uppercase) while top is running.
This will sort the processes by their CPU usage, showing the most CPU-intensive processes at the top.

Press M (uppercase) while top is running.
This will sort the processes by their memory usage, displaying the processes using the most memory at the top.
Press k, which prompts a process ID (PID) to kill (terminate)

To identify pid of a process using port number
```Linux
lsof -i :3000
```
To kill a process using PID
```Linux
kill -9 <PID>
```
To check how the start time and how long a process is running
```Linux
ps -p <PID> -o start,etime
ps -p <PID> -o etime
```


## Command Aliases
To create a alias for a command
```Linux
vi .bashrc
```
This is example for ls command 
```Linux
alias alias_ls='ls -l'
```
And then in the terminal
```Linux
source .bashrc
```
Or can use .bash_aliases file.

## systemd services

## Network

## storage
To check the disk space usage
```Linux
df -hT
```

To check the disk space used by files and directories
```Linux
du -sh <path-to-directory>
```
Sorting in decreasing order the disk usage by all the files and directories in the current directory. If required in asceding then remove the r flag.
```Linux
du -sh * | sort -nr
```

s option is used to add the storage used by all the files. If you remove it then it provides space used by files individually.

The lsblk command displays information about all available or specified block devices
```Linux
lsblk -f
```

## References
[https://www.digitalocean.com/community/tutorials/process-management-in-linux](https://www.digitalocean.com/community/tutorials/process-management-in-linux)
[https://www.cyberciti.biz/faq/how-to-check-how-long-a-process-has-been-running/](https://www.cyberciti.biz/faq/how-to-check-how-long-a-process-has-been-running/)


## File Handling
[https://www.digitalocean.com/community/tutorials/linux-commands#the-ln-command-in-linux](https://www.digitalocean.com/community/tutorials/linux-commands#the-ln-command-in-linux)
