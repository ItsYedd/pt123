export const convertVnPriceToNumber = (priceStr) => {
    if (!priceStr) return null;
  
    // Loại bỏ chữ, giữ lại số và đơn vị
    const match = priceStr.match(/([\d.,]+)\s*(triệu|nghìn|k)?/i);
  
    if (!match) return null;
  
    let value = parseFloat(match[1].replace(",", "."));
    const unit = match[2]?.toLowerCase();
  
    if (unit === "triệu") value *= 1_000_000;
    else if (unit === "nghìn") value *= 1_000;
  
    return value;
  };
  