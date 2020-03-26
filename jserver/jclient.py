import http.client, subprocess

c = http.client.HTTPConnection('localhost', 8080)

print("--------------- POST TEST -------------------")

#c.request('POST', '/return/world-population.json')
#doc = c.getresponse().read()
#print(doc)

print("------------- STEAM TEST SINGLE ------------")

#c.request('POST', '/stream/json', '{ "directory": "img", "render": "portrait.jpg", "type": "single" }')
#doc = c.getresponse().read()
#print(doc)

print("------------- STEAM TEST ALLINONE ------------")

c.request('POST', '/stream/json', '{ "directory": "img", "render": "", "type": "all" }')
doc = c.getresponse().read()
print(doc)

print("------------- STEAM TEST FEED ------------")

#c.request('POST', '/stream/img-*-conference.jpg', '{}')
#doc = c.getresponse().read()
#print(doc)

print("--------------- GET TEST -------------------")

#c.request('GET', '/return/portrait.jpg')
#doc = c.getresponse().read()
#print(doc)
