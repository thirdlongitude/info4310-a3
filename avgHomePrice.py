import csv

def compute_average_home_price(file_path):
    total_price = 0
    num_homes = 0
    
    neighborhood_list = {} # homes, total price

    with open(file_path, newline='') as csvfile:
        
        reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        header = next(reader) 
        for row in reader:
            neighborhood = row[0]
            if neighborhood not in neighborhood_list:
                neighborhood_list[neighborhood] = [1, int(row[10])] # number of homes, total price
            else:
                neighborhood_list[neighborhood][0] += 1 # increment number of homes
                neighborhood_list[neighborhood][1] += int(row[10]) # add sale price to total price
    csvfile.close()

    with open("output.csv", 'w') as csvfile:
        writer = csv.writer(csvfile, delimiter=",", quotechar='"')
        writer.writerow(["Neighborhood", "Average Price"])
        for neighborhood in neighborhood_list:
            writer.writerow([neighborhood, neighborhood_list[neighborhood][1] / neighborhood_list[neighborhood][0]])
    csvfile.close()


file_path = 'zillow.csv'
compute_average_home_price(file_path)
