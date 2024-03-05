import json

# Step 2: Read the JSON File
with open('planets.json', 'r') as file:
    planets = json.load(file)

# Step 3: Update the Data
def add_messages_to_planets(planets_data):
    message_template = "Explore the mysteries of {}!"
    for key in planets_data:
        planets_data[key] = {
            "name": planets_data[key],
            "message": message_template.format(planets_data[key])
        }
    return planets_data

updated_planets = add_messages_to_planets(planets)

# Step 4: Write the Updated Data to a New JSON File
with open('updated_planets.json', 'w') as file:
    json.dump(updated_planets, file, indent=4)

print("Planets have been updated with messages.")
