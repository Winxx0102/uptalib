export function getPagination(query: any) {
    const take = parseInt(query.limit) || 10;
    const page = parseInt(query.page) || 1
    const skip = (page - 1) * take
    return { take, page, skip }

}