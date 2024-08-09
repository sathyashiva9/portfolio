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

### Logs
Logs are managed using logrotate so that they do not consume more space. The main logrotate.conf file is the global configuration file for logrotate. It sets default behaviors that apply to all log files unless overridden by service-specific configuration files.
To view it
```Linux
cat /etc/logrotate.conf
```

The files in the /etc/logrotate.d/ directory contain log rotation configurations for specific services or applications. Each file typically corresponds to a particular service, like apache2, nginx, syslog, etc.
```Linux
ls /etc/logrotate.d
```
```Linux
$ cat /etc/logrotate.d/rsyslog
/var/log/syslog
/var/log/mail.info
/var/log/mail.warn
/var/log/mail.err
/var/log/mail.log
/var/log/daemon.log
/var/log/kern.log
/var/log/auth.log
/var/log/user.log
/var/log/lpr.log
/var/log/cron.log
/var/log/debug
/var/log/messages
{
	rotate 4
	weekly
	missingok
	notifempty
	compress
	delaycompress
	sharedscripts
	postrotate
		/usr/lib/rsyslog/rsyslog-rotate
	endscript
}
```

THe var/log directory is the standard for storing log files on almost all Linux distributions. To view the size occupied by all the logs
```Linux
sudo du -ch /var/log
```

To find logs that were last modified more than 7 daysago (here 7 is the no. of days and filters the results to include only files that were last modified more than 7 days ago. If you want less than 7 then -7 and 7 for exactly 7. mtim refers to modified-time).
```Linux
sudo find /var/log -type f -mtime +7
```
TO see the disk usage of systemd service logs
```Linux
journalctl --disk-usage 
```
Can see them under /var/log/journal

TO delete journal logs older than specific days
```
sudo journalctl --vacuum-time=7d
```

Also we can clear logs until we reduce the total size to 1GB
```
journalctl --vacuum-size=1G 
```
The /etc/systemd/journald.conf config file is used to determine how systemd logs are deleted.

## Security
SSH
To connect to your EC2 instance
```
ssh -i /path/to/your-key.pem ec2-user@your-ec2-public-ip
```
port forwarding
If we access the local port 3000, we actually make a request to port 80 of remote-server.com
```
ssh -i Downloads/new_one.pem -L 3000:localhost:80 ec2-user@13.233.113.34
```

TO copy files from local to remote server
```
scp -i /path/to/your/private-key.pem /path/to/local/file username@ec2-instance-public-ip:/path/to/remote/directory
```
## References
[https://www.digitalocean.com/community/tutorials/process-management-in-linux](https://www.digitalocean.com/community/tutorials/process-management-in-linux)
[https://www.cyberciti.biz/faq/how-to-check-how-long-a-process-has-been-running/](https://www.cyberciti.biz/faq/how-to-check-how-long-a-process-has-been-running/)
[https://www.baeldung.com/linux/clean-up-linux-system](https://www.baeldung.com/linux/clean-up-linux-system)
[https://www.baeldung.com/linux/systemd-journal-logs-clear](https://www.baeldung.com/linux/systemd-journal-logs-clear)
[https://www.baeldung.com/linux/secure-shell-ssh](https://www.baeldung.com/linux/secure-shell-ssh)

## File Handling
[https://www.digitalocean.com/community/tutorials/linux-commands#the-ln-command-in-linux](https://www.digitalocean.com/community/tutorials/linux-commands#the-ln-command-in-linux)
