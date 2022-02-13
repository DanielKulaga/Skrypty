local lapis = require("lapis")
local app = lapis.Application()
local json_params = require("lapis.application").json_params

local shopProducts = {fruits = { {name = "orange"}, {name = "banana"}}, vegetables = {}}

app:get("/", function()
  return "Witaj w osiedlowym sklepie online"
end)

--http://localhost:8080/api/products/
app:get("/api/products", function()
  return { 
      json = { 
          products = shopProducts 
      }
   }
end)

--http://localhost:8080/api/products/fruits/1
app:get("/api/products/:category/:id", function(self)
  local category = shopProducts[self.params.category]
  local product = category[tonumber(self.params.id)]
  
  if not product then
    return { status = 404 }
  end
 
  return { 
      json = { 
          product = product
      }
   }
end)

--http://localhost:8080/api/newCategory { "category": "bread "}
app:post("/api/newCategory", json_params(function(self)
  shopProducts[self.params.category] = {}
  return { 
      json = { 
          products = shopProducts
      }
   }

end))

--http://localhost:8080/api/newCategory { "category": "fruits", "name": "apple" }
app:post("/api/newProduct", json_params(function(self)
  table.insert(shopProducts[self.params.category], { name = self.params.name } )
  return { 
      json = { 
          product = shopProducts[self.params.category]
      }
   }

end))

--http://localhost:8080/api/product/fruits/1 { "name": "apple" }
app:put("/api/product/:category/:id", json_params(function(self)  
  if not shopProducts[self.params.category] then
    return { status = 404 }
  end
    
  if not shopProducts[self.params.category][tonumber(self.params.id)] then
    return { status = 404 }
  end
  
  shopProducts[self.params.category][tonumber(self.params.id)] = { name = self.params.name }
  
  return { 
      json = { 
          product = shopProducts[self.params.category]
      }
   }
end))

--http://localhost:8080/api/product/fruits/1
app:delete("/api/product/:category/:id", function(self)
  if not shopProducts[self.params.category][tonumber(self.params.id)] then
    return { status = 404 }
  end
  
  shopProducts[self.params.category][tonumber(self.params.id)] = { }
  
  return { 
      json = { 
          product = shopProducts[self.params.category]
      }
   }
end)

return app
