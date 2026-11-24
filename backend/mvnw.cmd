@echo off
if exist "C:\Users\Lingesh\AppData\Local\Programs\Eclipse Adoptium\jdk-21.0.5.11-hotspot" (
    set "JAVA_HOME=C:\Users\Lingesh\AppData\Local\Programs\Eclipse Adoptium\jdk-21.0.5.11-hotspot"
    set "PATH=C:\Users\Lingesh\AppData\Local\Programs\Eclipse Adoptium\jdk-21.0.5.11-hotspot\bin;%PATH%"
)
"C:\Users\Lingesh\.m2\wrapper\dists\apache-maven-3.9.16\0daed3be3ebd1c706f0e69e8b07c6b73f5cc4ea3dfce72a8d0ec2e849ca2ddb0\bin\mvn.cmd" %*
