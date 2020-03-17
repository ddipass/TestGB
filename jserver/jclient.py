import http.client, subprocess

c = http.client.HTTPConnection('localhost', 8080)

print("--------------- POST TEST -------------------")

c.request('POST', '/return/world-population.json', '{}')
doc = c.getresponse().read()
print(doc)

print("--------------- GET TEST -------------------")

c.request('GET', '/return/annotations.json')
doc = c.getresponse().read()
print(doc)
