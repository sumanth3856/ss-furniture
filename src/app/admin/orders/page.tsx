"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, 
  Clock, 
  Package, 
  Truck, 
  CheckCircle,
  Search,
  Filter,
  Eye,
  X,
  ChevronDown,
  RefreshCw,
  MoreHorizontal,
  FileText,
  Phone,
  MapPin
} from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  paymentMethod: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    customer: {
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      address: "42, MG Road, Sector 14, Gurugram, Haryana 122001"
    },
    items: [
      { name: "Milano Leather Sofa - 3 Seater", quantity: 1, price: 89999 },
      { name: "Nesting Coffee Table Set", quantity: 1, price: 24999 }
    ],
    total: 114998,
    status: "pending",
    createdAt: "2024-03-15T10:30:00",
    paymentMethod: "UPI"
  },
  {
    id: "ORD-2024-002",
    customer: {
      name: "Rahul Verma",
      email: "rahul.v@email.com",
      phone: "+91 87654 32109",
      address: "15/A, Lake View Apartments, Whitefield, Bangalore 560066"
    },
    items: [
      { name: "Ergonomic Office Chair - Premium", quantity: 2, price: 34999 }
    ],
    total: 69998,
    status: "processing",
    createdAt: "2024-03-14T14:22:00",
    paymentMethod: "Card"
  },
  {
    id: "ORD-2024-003",
    customer: {
      name: "Ananya Patel",
      email: "ananya.p@email.com",
      phone: "+91 76543 21098",
      address: "7th Floor, Sea View Residency, Juhu, Mumbai 400049"
    },
    items: [
      { name: "Walnut Finish King Bed - 6x6", quantity: 1, price: 79999 },
      { name: "Pair of Nightstands", quantity: 2, price: 12999 }
    ],
    total: 105997,
    status: "shipped",
    createdAt: "2024-03-12T09:15:00",
    paymentMethod: "Net Banking"
  },
  {
    id: "ORD-2024-004",
    customer: {
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      phone: "+91 65432 10987",
      address: "House No. 23, Green Park Extension, New Delhi 110016"
    },
    items: [
      { name: "Brass Table Lamp - Royal", quantity: 3, price: 4999 }
    ],
    total: 14997,
    status: "delivered",
    createdAt: "2024-03-08T16:45:00",
    paymentMethod: "UPI"
  },
  {
    id: "ORD-2024-005",
    customer: {
      name: "Meera Reddy",
      email: "meera.reddy@email.com",
      phone: "+91 54321 09876",
      address: "Plot 45, Banjara Hills Road No. 12, Hyderabad 500034"
    },
    items: [
      { name: "Modular Wardrobe System", quantity: 1, price: 129999 }
    ],
    total: 129999,
    status: "pending",
    createdAt: "2024-03-15T11:20:00",
    paymentMethod: "EMI"
  }
];

const statusConfig = {
  pending: { 
    label: "Pending", 
    icon: Clock, 
    color: "text-yellow-600", 
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    badge: "bg-yellow-100 text-yellow-700"
  },
  processing: { 
    label: "Processing", 
    icon: Package, 
    color: "text-blue-600", 
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700"
  },
  shipped: { 
    label: "Shipped", 
    icon: Truck, 
    color: "text-purple-600", 
    bg: "bg-purple-50",
    border: "border-purple-200",
    badge: "bg-purple-100 text-purple-700"
  },
  delivered: { 
    label: "Delivered", 
    icon: CheckCircle, 
    color: "text-emerald-600", 
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700"
  },
  cancelled: { 
    label: "Cancelled", 
    icon: X, 
    color: "text-red-600", 
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700"
  }
};

export default function AdminOrdersPage() {
  const [orders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusCounts = () => ({
    all: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  });

  const statusCounts = getStatusCounts();
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", { 
      day: "numeric", 
      month: "short", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Orders</h2>
          <p className="text-gray-500 text-sm mt-0.5 sm:mt-1">
            {filteredOrders.length} orders · ₹{totalRevenue.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="p-2 sm:p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-colors" title="Refresh">
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button className="hidden sm:flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all text-sm sm:text-base">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
        {[
          { key: "all", label: "All", icon: ShoppingCart, color: "text-gray-600", bg: "bg-gray-50" },
          { key: "pending", label: "Pending", icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
          { key: "processing", label: "Processing", icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
          { key: "shipped", label: "Shipped", icon: Truck, color: "text-purple-600", bg: "bg-purple-50" },
          { key: "delivered", label: "Delivered", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((status, index) => {
          const Icon = status.icon;
          return (
            <motion.div
              key={status.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setStatusFilter(status.key)}
              className={`bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm border cursor-pointer transition-all hover:shadow-md ${
                statusFilter === status.key 
                  ? "border-amber-300 ring-2 ring-amber-100" 
                  : "border-gray-100"
              }`}
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 ${status.bg} rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3`}>
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${status.color}`} />
              </div>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{statusCounts[status.key as keyof typeof statusCounts]}</p>
              <p className="text-[10px] sm:text-sm text-gray-500">{status.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-gray-100">
          <div className="flex flex-col gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <div className="relative flex-1 sm:flex-none sm:w-auto">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full sm:w-auto appearance-none px-3 sm:px-4 py-2 sm:py-3 pr-8 sm:pr-10 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm cursor-pointer bg-white"
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <ChevronDown className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:overflow-x-auto">
          <div className="lg:hidden divide-y divide-gray-100">
            {filteredOrders.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <ShoppingCart className="w-7 h-7 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No orders found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search</p>
              </div>
            ) : (
              filteredOrders.map((order, index) => {
                const status = statusConfig[order.status];
                const StatusIcon = status.icon;
                return (
                  <motion.div 
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => openOrderDetails(order)}
                    className="p-4 hover:bg-gray-50/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-semibold text-gray-900">{order.id}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${status.badge}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{order.customer.name}</p>
                        <p className="text-xs text-gray-500">{order.items.reduce((sum, i) => sum + i.quantity, 0)} items</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-gray-900 text-sm">₹{order.total.toLocaleString("en-IN")}</p>
                        <p className="text-[10px] text-gray-400">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order, index) => {
                  const status = statusConfig[order.status];
                  const StatusIcon = status.icon;
                  return (
                    <motion.tr 
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-semibold text-gray-900">{order.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{order.customer.name}</p>
                          <p className="text-sm text-gray-500">{order.customer.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-700">{order.items.reduce((sum, i) => sum + i.quantity, 0)} items</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">
                          ₹{order.total.toLocaleString("en-IN")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${status.badge}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openOrderDetails(order)}
                            className="p-2.5 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showOrderModal && selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setShowOrderModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none"
            >
              <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-hidden pointer-events-auto">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Order Details</h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">{selectedOrder.id}</p>
                  </div>
                  <button
                    onClick={() => setShowOrderModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(85vh-80px)] sm:max-h-[calc(90vh-160px)] space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium ${statusConfig[selectedOrder.status].badge}`}>
                      {statusConfig[selectedOrder.status].label}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">{formatDate(selectedOrder.createdAt)}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="p-4 sm:p-5 bg-gray-50 rounded-xl sm:rounded-2xl">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 sm:mb-4">Customer</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="text-amber-600 font-bold text-sm sm:text-lg">
                              {selectedOrder.customer.name.charAt(0)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{selectedOrder.customer.name}</p>
                            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 mt-0.5">
                              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                              {selectedOrder.customer.phone}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 mt-0.5 truncate">
                              <span className="w-3 h-3 sm:w-3.5 sm:h-3.5">@</span>
                              {selectedOrder.customer.email}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 pt-2 border-t border-gray-200">
                          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                          <span className="line-clamp-2">{selectedOrder.customer.address}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 bg-gray-50 rounded-xl sm:rounded-2xl">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 sm:mb-4">Payment</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm">Method</span>
                          <span className="font-medium text-gray-900 text-sm">{selectedOrder.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                          <span className="text-gray-600 text-sm">Total</span>
                          <span className="text-base sm:text-xl font-bold text-gray-900">
                            ₹{selectedOrder.total.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 sm:mb-4">Items ({selectedOrder.items.length})</h4>
                    <div className="space-y-2 sm:space-y-3">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                          <div className="flex items-center gap-2 sm:gap-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm">
                              <Package className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-gray-900 text-xs sm:text-sm truncate max-w-[150px] sm:max-w-none">{item.name}</p>
                              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-semibold text-gray-900 text-xs sm:text-sm flex-shrink-0 ml-2">
                            ₹{item.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 border-t border-gray-100 bg-gray-50/50">
                  <button
                    onClick={() => setShowOrderModal(false)}
                    className="flex-1 px-4 py-3 sm:py-3.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors text-sm sm:text-base"
                  >
                    Close
                  </button>
                  <button className="flex-1 px-4 py-3 sm:py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden xs:inline">Download Invoice</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
