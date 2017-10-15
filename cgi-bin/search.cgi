#!C:/Strawberry/perl/bin/perl.exe
print "Content-type: text/html\n\n";
use DBI;
use strict;
use JSON;
use Data::Dumper;
use CGI;

my $driver   = "SQLite";
my $database = "appointment.db";
my $dsn      = "DBI:$driver:dbname=$database";
my $userid   = "";
my $password = "";
my $dbh      = DBI->connect( $dsn, $userid, $password, { RaiseError => 1 } )
  or die $DBI::errstr;
my $q    = CGI->new;
my $toSelect = $q->param('toSelect');
$toSelect = "" . $toSelect;

my $isEmpty = ( $toSelect eq "" ? "yes" : "no" );

my $stmt;
if ( $isEmpty eq "yes" ) {
    $stmt = qq(SELECT DESCRIPTION, APPOINTMENT from APPOINTMENTS;);
}
else {
    $stmt =
qq(SELECT DESCRIPTION, APPOINTMENT from APPOINTMENTS where DESCRIPTION LIKE ? ;);
}
my $sth = $dbh->prepare($stmt);
if ( $isEmpty eq "no" ) {
    $sth->bind_param( 1, "%" . $toSelect . "%" );
}
my $rv = $sth->execute() or die $DBI::errstr;

if ( $rv < 0 ) {
    print $DBI::errstr;
}

my $json = JSON->new->utf8;
my @temp_array;
while ( my @row = $sth->fetchrow_array() ) {
    my %json_hash = (
        "Description" => $row[0],
        "Date"        => $row[1]

    );
    push( @temp_array, \%json_hash );

}

print $json->encode( \@temp_array ) . "\n";

$dbh->disconnect();
