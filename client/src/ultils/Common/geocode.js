export const getCoordinatesFromAddress = async (address) => {
    try {
      // Xử lý tiền tố "Địa chỉ:"
      const cleanedAddress = address.replace(/^Địa chỉ:\s*/, '');
  
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanedAddress)}&limit=1`
      );
  
      const data = await response.json();
      if (data.length > 0) {
        //console.log('Tọa độ:', data[0]); // Debug thêm nếu cần
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
  
      //console.warn('Không tìm được tọa độ cho:', cleanedAddress);
      return null;
    } catch (error) {
      //console.error('Lỗi khi lấy toạ độ từ địa chỉ:', error);
      return null;
    }
  };
  