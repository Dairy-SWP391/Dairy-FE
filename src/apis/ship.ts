import http from "../utils/http";

export type ProvinceType = {
  ProvinceID: number;
  ProvinceName: string;
};

export type DistrictType = {
  DistrictID: number;
  DistrictName: string;
};

export type WardType = {
  WardCode: number;
  WardName: string;
};

export const getProvince = () => http.get<ProvinceType[]>("ship/provinces");

export const getDistrict = (province_id: string) =>
  http.post<DistrictType[]>("ship/districts", {
    province_id
  });

export const getWard = (district_id: string) =>
  http.post<WardType[]>("ship/wards", {
    district_id
  });

export const getPackageService = (to_district: string) =>
  http.post<{ service_id: number; short_name: string }[]>(
    "ship/package-services",
    {
      to_district
    }
  );

export type CartItem = {
  id: number;
  name: string;
  quantity: number;
  ship_category_id: "BABY" | "MOMY";
  volume: number;
  weight: number;
  price: number;
  avatar_url: string;
};

type FeeShipResponse = {
  cart_list: CartItem[];
  allQuality: number;
  totalMoney: number;
  fee: {
    total: number;
    service_fee: number;
    insurance_fee: number;
    pick_station_fee: number;
    coupon_value: number;
    r2s_fee: number;
    return_again: number;
    document_return: number;
    double_check: number;
    cod_fee: number;
    pick_remote_areas_fee: number;
    deliver_remote_areas_fee: number;
    cod_failed_fee: number;
    totalHeight: number;
    totalLength: number;
    totalWeight: number;
    totalWidth: number;
  };
};

export const getFeeShip = ({
  cart_list,
  service_id,
  to_district_id,
  to_ward_code,
  receiver_name,
  phone_number,
  address,
  voucher_code
}: {
  service_id: number;
  to_district_id: number;
  to_ward_code: number;
  cart_list: { product_id: number; quantity: number }[];
  receiver_name: string;
  phone_number: string;
  address: string;
  voucher_code?: string;
}) =>
  http.post<FeeShipResponse>("ship/fee", {
    service_id,
    to_district_id,
    to_ward_code,
    cart_list,
    receiver_name,
    phone_number,
    address,
    voucher_code
  });
