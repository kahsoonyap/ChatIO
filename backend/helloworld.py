import sys


order = ["" , "" , ""]
print("Hello, welcome. What would you like to order?")
print("Burgers: Hamburger- $3.99, Cheeseburger- $4.99, VeggieBurger- $2.99")
Combo_discount = True
Burger = raw_input()
if Burger == "Hamburger":
    price = 3.99
    print("Hamburger: $3.99")
    order[0]=str("Hamburger - $3.99")
if Burger == "Cheeseburger":
    price = 4.99
    print("Cheeseburgeer: $4.99")
    order[0]=str("Cheeseburger - $4.99")
if Burger == "VeggieBurger":
    price = 2.99
    print("VeggieBurger: $2.99")
    order[0]= str("VeggieBurger - $2.99")
print(" ")
print("Would you like a drink?")
answer= raw_input()
print(" ")
if answer == "Yes":
    print("What size would you like for your drink?")
    print("Small: $1.99 Medium: $2.99 Large: $3.99")
    Drink=raw_input()
    if Drink == "Small":
        price = price + 1.99
        print("$1.99")
    if Drink == "Medium":
        price = price + 2.99
        print("$2.99")
    if Drink == "Large":
        price == price + 3.99
        print("$3.99")
    print(" ")
    print("What would you like to drink?")
    print("Sprite, Fanta, Coca-cola.")
    Drink_selection=raw_input()
    print("")
    if Drink_selection == "Sprite":
        print("Sprite")
        print(Drink)
        order[1]=str("Sprite")
    if Drink_selection == "Fanta":
        print("Fanta")
        print(Drink)
        order[1]=str("Fanta")
    if Drink_selection == "Coca-cola":
        print("Coca-cola")
        print(Drink)
        order[1]=str("Coca-cola")
if answer == "No":
    Combo_discount = False    
print(" ")
print("Would you like Fries?")
response=raw_input()
print(" ")
if response == "Yes":
    print("What size is would you like your fries?")
    print("Fries: Small- $1.50, Medium- $1.99, Large- $2.99")
    Fries=raw_input()
    if Fries == "Small":
        print(" ")
        print("Would you like to MEGA-SIZE your fries?")
        megasize=raw_input()
        if megasize == "No":
            price=price + 1.50
            print("Fries-Small $1.50")
            order[2]=str("Small Fries - $1.50")
        if megasize == "Yes":
            price =price + 3.99
            print("Fries-MEGA-SIZE $3.00")
            order[2]=str("MEGA-SIZE Fries - $2.99")
    if Fries == "Medium":
        price=price + 1.99
        print(" Fries-Medium $1.99")
        order[2]=str("Medium Fries - $1.99")
    if Fries == "Large":
        price=price + 2.99
        print(" Fries-Large $2.99")
        order[2]=str("Large Fries - $2.99")
if response == "No":
    Combo_discount = False        
print(" ")
print("How many ketchup packets would you like? One ketchup packet is .10 cents.")
ketchup_amount=raw_input()
ketchup_price=0
ketchup_price=int(ketchup_amount) * .100
price=price + ketchup_price
print(" ")
print("That will add:")
print(ketchup_price)
print("to your total bill.")
print(" ")
print("Total Price:")
print(price)
print(" ")
print(order)
if Combo_discount == True:
    print("You will recieve a 5 dollar discount because you orderd a drink burger and fries.")
    print(" ")
    print("Original price:")
    print(price)
    Combo_discount=5.00
    print(" ")
    print("New Price:")
    price= price- int(Combo_discount)
    print(price)