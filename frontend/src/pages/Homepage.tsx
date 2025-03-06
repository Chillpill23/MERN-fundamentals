import { useColorModeValue } from "@/components/ui/color-mode"
import { useProductStore } from "../store/product"
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import ProductCard from "@/components/ProductCard"

const Homepage = () => {

  const {fetchProducts, products} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  return (
    <Container maxW='container.xl' py={12}>
      <VStack gap={8} >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          color={useColorModeValue("white.300","black.900")}
        >
          Current Products
        </Text>

        <SimpleGrid
          columns={{
            base:1,
            md:2,
            lg:3,
          }}
          gap={10}
          w={'full'}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product}/>
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
              No products found 😢{" "}
              <Link to={"/create"}>
                <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                  Create a product
                </Text>
              </Link>
            </Text>
          )}
      </VStack>
    </Container>
  )
}

export default Homepage