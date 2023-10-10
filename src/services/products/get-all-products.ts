import type { ApiContext, Category, Condition, Product } from "@/types/data"
import { fetcher } from "@/utils"

export type GetAllProductsParams = {
  categroy?: Category
  conditions?: Condition[]
  userId?: number
  sort?: keyof Omit<Product, "owner">
  order?: "asc" | "desc"
  limit?: number
  page?: number
}

const getAllProducts = async (
  context: ApiContext,
  {
    categroy,
    conditions,
    userId,
    page,
    limit,
    sort = "id",
    order = "desc",
  }: GetAllProductsParams = {},
): Promise<Product[]> => {
  const path = `${context.apiRootUrl.replace(/\/$/g, "")}/products`
  const params = new URLSearchParams()

  categroy && params.append("category", categroy)
  conditions &&
    conditions.forEach((condition) => params.append("condition", condition))
  userId && params.append("owner.id", `${userId}`)
  page && params.append("_page", `${page}`)
  limit && params.append("_limit", `${limit}`)
  sort && params.append("_sort", sort)
  order && params.append("_order", order)
  const query = params.toString()

  return await fetcher(query.length > 0 ? `${path}?${query}` : path, {
    headers: {
      Origin: "*",
      Accept: "application/json",
      "Content-TYpe": "application/json",
      credentials: "include",
    },
  })
}

export default getAllProducts
