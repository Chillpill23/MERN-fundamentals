// @ts-nocheck

import { Product, useProductStore } from "@/store/product"
import { Box, Button, Heading, HStack, IconButton, Image, Input, Text, VStack } from "@chakra-ui/react"
import { useColorModeValue } from "./ui/color-mode"
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Toaster, toaster } from "@/components/ui/toaster"

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogBackdrop,
  DialogActionTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";

interface ProductCardProps {
  key?:string | number,
  product:Product,
}

const ProductCard = ({product}:ProductCardProps) => {

  const [isOpen, setIsOpen] = useState(false);

  const [updatedProduct, setUpdatedProduct] = useState(product)

  const textColor = useColorModeValue("gray.600", "gray.200")
  const bg = useColorModeValue("white", "gray.800")

  const {deleteProduct, updateProduct} = useProductStore();
  
  const handleDeleteProduct = async (pid) => {
   const {success,message} = await deleteProduct(pid);
    if(!success){
      toaster.error({
        title:"Error",
        description: message || "Failed to delete product.",
        action: {
          label: "Close",
          onClick: () => toaster.dismiss(), // Dismisses the toast manually
        },
      })
    }else{
      toaster.success({
        title:"Success",
        description: message || "Product has been deleted",
        action: {
          label: "Close",
          onClick: () => toaster.dismiss(), // Dismisses the toast manually
        },
      })
    }
  }

  const handleUpdateProduct = async (pid, updatedProduct) => {
      const {success, message} = await updateProduct(pid, updatedProduct);
      if(!success){
        toaster.error({
          title:"Error",
          description: message || "Failed to update product.",
          action: {
            label: "Close",
            onClick: () => toaster.dismiss(), // Dismisses the toast manually
          },
        })
      }else{
        toaster.success({
          title:"Success",
          description: message || "Product has been updated",
          action: {
            label: "Close",
            onClick: () => toaster.dismiss(), // Dismisses the toast manually
          },
        })
      }
      setIsOpen(false)
  }

  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{transform:"translateY(-5px", shadow:"xl"}}
      bg={bg}
    >
      <Toaster />
      <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover'/>
      <Box p={4}>
        <Heading
          as='h3' size='md' mb={2}
        >
          {product.name}
        </Heading>

        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack gap={2}>

            <DialogRoot open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <IconButton aria-label="Edit product" colorScheme="blue">
                  <FaRegEdit />
                </IconButton>
              </DialogTrigger>

              <DialogBackdrop />
              <DialogContent>
                <DialogCloseTrigger />
                <DialogHeader>
                  <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <VStack spacing={4}>
                    <Input
                      placeholder='Product Name'
                      name='name'
                      value={updatedProduct.name}
                      onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                    />
                    <Input
                      placeholder='Price'
                      name='price'
                      type='number'
                      value={updatedProduct.price}
                      onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                    />
                    <Input
                      placeholder='Image URL'
                      name='image'
                      value={updatedProduct.image}
                      onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                    />
                  </VStack>
                </DialogBody>
                <DialogFooter>
                  <Button
                    colorScheme='blue'
                    mr={3}
                    onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                  >
                      Update
                  </Button>
                  <DialogActionTrigger asChild>
                    <Button variant='ghost'>
                      Cancel
                    </Button>
                  </DialogActionTrigger>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>

            <IconButton
              aria-label="Delete product"
              onClick={() => handleDeleteProduct(product._id, updatedProduct)}
              colorScheme='red'
            >
              <MdDeleteForever />
            </IconButton>
        </HStack>
      </Box>
    </Box>
  )
}

export default ProductCard