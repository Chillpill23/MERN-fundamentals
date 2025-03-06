import { useColorModeValue } from "@/components/ui/color-mode"
import { Box, Button, Container, Heading, Input, VStack } from "@chakra-ui/react"
import { useState } from "react"
import {useProductStore} from '../store/product'
import { Toaster, toaster } from "@/components/ui/toaster"


const CreatePage = () => {

  const [newProduct, setNewProduct] = useState({
    name:"",
    price:"",
    image:""
  })

  const { createProduct } = useProductStore();

  const handleAddProduct = async () =>{
    const {success, message} = await createProduct(newProduct);
    if(!success){
      toaster.error({
        title:"Error",
        description: message || "Failed to create product.",
        action: {
          label: "Close",
          onClick: () => toaster.dismiss(), // Dismisses the toast manually
        },
      })
    }else{
      toaster.success({
        title:"Success",
        description: message|| "Product has been created",
        action: {
          label: "Close",
          onClick: () => toaster.dismiss(), // Dismisses the toast manually
        },
      })
    }
  }


  return (
    <Container maxW={"container.sm"}>
      <Toaster />
      <VStack
       gap={8} 
      >
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={"8"}>
            Create new product
        </Heading>

        <Box
          w={"full"} 
          maxW={"600px"}
          bg={useColorModeValue("white","gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
            <VStack gap={4}>
              <Input
                borderColor= {"#cfcfcf"}
                placeholder='Product Name'
                name="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name:e.target.value})} 
              />
              <Input 
                borderColor= {"#cfcfcf"}
                placeholder='Price'
                name="price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price:e.target.value})} 
              />
              <Input 
                borderColor= {"#cfcfcf"}
                placeholder='Image URL'
                name="image"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image:e.target.value})} 
              />
            </VStack>

            <Button colorScheme='blue' onClick={handleAddProduct} w='full' mt={8}>Add Product</Button>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage