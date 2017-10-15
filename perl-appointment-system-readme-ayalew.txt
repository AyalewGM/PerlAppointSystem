
In this application I used Strawberry perl 64 bit at C:\Strawberry. 

Command line perl interpreter path  !C:/Strawberry/perl/bin/perl.exe,  need to be changed to appropirate path on you computer. 
      
I used wamp server with embedder Apache version Apache 2.4.23. I have included my httpd.conf just for your reference to configure  C:\wamp\bin\apache\apache2.4.23\conf\httpd.conf
To run please put all files in cgi-bin of this folder in corresponding cgi-bin of wamp installation path and replace current index.php by index.html in WWW directory of Wamp. The js, css and directories must be placed in www folder of wamp.   

The followings are the lines I changed in C:\wamp\bin\apache\apache2.4.23\conf\httpd.conf


1. I changed DirectoryIndex in the follwoing way. 
<IfModule dir_module>
    DirectoryIndex index.html index.htm index.php index.php3 index.cgi index.pl
</IfModule>

2. Moreover please search for this line on and uncomment
   #AddHandler cgi-script .cgi and replace it with.
   AddHandler cgi-script .cgi .pl

Additional technologies used: 
HTML, CSS, bootstrap, Jquery and Ajax

I have included screenshots of the application. It runs perfectly and solves the problem specified in requirement document. The generated database is included in cgi-bin folder. If you have questions, you can always call me or send me email.
