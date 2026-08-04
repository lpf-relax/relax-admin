// 将字符串转为 Base64（支持中文等 Unicode 字符）
function stringToBase64(str: string) {
  // 使用 TextEncoder 将字符串转为 Uint8Array（UTF-8 编码）
  const encoder = new TextEncoder();
  const encoded = encoder.encode(str);

  // 将 Uint8Array 转为二进制字符串
  let binaryString = '';
  for (let i = 0; i < encoded.length; i++) {
    binaryString += String.fromCharCode(encoded[i]);
  }

  // 使用 btoa 进行 Base64 编码
  return btoa(binaryString);
}

export default stringToBase64;
