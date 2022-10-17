/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/contract",
        destination:
          "https://etherscan.io/address/0x208d1008fa508414b6dc63738bc8560a12ef5279",
        permanent: true,
      },
    ];
  },
};
