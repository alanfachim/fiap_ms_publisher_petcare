#### Public Subnets

# Public Subnet on sa-east-1a
resource "aws_subnet" "private_subnet_sa_east_1a" {
  vpc_id                  = "${aws_vpc.cluster_vpc.id}"
  cidr_block              = "10.0.36.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "sa-east-1a"

  tags = {
    Name = "${var.cluster_name}-private-subnet-1a"
  }
}

# Public Subnet on sa-east-1b
resource "aws_subnet" "private_subnet_sa_east_1b" {
  vpc_id                  = "${aws_vpc.cluster_vpc.id}"
  cidr_block              = "10.0.35.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "sa-east-1b"

  tags = {
    Name = "${var.cluster_name}-private-subnet-1b"
  }
}

# Associate subnet public_subnet_sa_east_1a to public route table
resource "aws_route_table_association" "private_subnet_sa_east_1a_association" {
  subnet_id      = "${aws_subnet.private_subnet_sa_east_1a.id}"
  route_table_id = "${aws_route_table.privete_route_table_id.id}"
}

# Associate subnet public_subnet_sa_east_1b to public route table
resource "aws_route_table_association" "private_subnet_sa_east_1b_association" {
  subnet_id      = "${aws_subnet.private_subnet_sa_east_1b.id}"
  route_table_id = "${aws_route_table.privete_route_table_id.id}"
}
