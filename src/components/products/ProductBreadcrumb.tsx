import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ProductBreadcrumbProps {
  productName?: string;
}

const ProductBreadcrumb = ({ productName }: ProductBreadcrumbProps) => (
  <Breadcrumb className="mb-8">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link to="/">Home</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        {productName ? (
          <BreadcrumbLink asChild>
            <Link to="/products">Products</Link>
          </BreadcrumbLink>
        ) : (
          <BreadcrumbPage>Products</BreadcrumbPage>
        )}
      </BreadcrumbItem>
      {productName && (
        <>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{productName}</BreadcrumbPage>
          </BreadcrumbItem>
        </>
      )}
    </BreadcrumbList>
  </Breadcrumb>
);

export default ProductBreadcrumb;
