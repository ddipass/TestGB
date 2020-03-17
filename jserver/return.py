import sys
def func(input):
    # Use file to refer to the file object
    with open(input) as file: 
        data = file.read()
        print(data)
func(sys.argv[1])
