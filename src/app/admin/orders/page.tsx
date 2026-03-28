"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Clock, Package, Truck, CheckCircle } from "lucide-react";

export default function AdminOrdersPage() {
  const orderStatuses = [
    { icon: Clock, label: "Pending", count: 0, color: "text-yellow-500", bg: "bg-yellow-50" },
    { icon: Package, label: "Processing", count: 0, color: "text-blue-500", bg: "bg-blue-50" },
    { icon: Truck, label: "Shipped", count: 0, color: "text-purple-500", bg: "bg-purple-50" },
    { icon: CheckCircle, label: "Delivered", count: 0, color: "text-green-500", bg: "bg-green-50" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
        <p className="text-gray-500">Manage customer orders and track deliveries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {orderStatuses.map((status, index) => {
          const Icon = status.icon;
          return (
            <motion.div
              key={status.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
            >
              <div className={`w-10 h-10 ${status.bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${status.color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{status.count}</p>
              <p className="text-sm text-gray-500">{status.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShoppingCart className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Yet</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Orders will appear here once customers start placing them. This feature will be fully functional once authentication is implemented.
        </p>
      </div>
    </div>
  );
}
