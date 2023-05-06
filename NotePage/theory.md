> > > > > \*\*\* Xây dựng trang Auth cho Netflix

- -> Chúng ta sẽ hiển thị background của NetFlix và cho một lớp phủ lên background đó
- -> Tạo 1 lớp slay phủ lên tấm ảnh hero của component `Auth`
- -> Tiếp theo cho một phần tử điều hướng vào -> Để chứa tấm ảnh logo của `Netflix`
- -> Dùng state để quản lí các giá trị của form

> > > > Khai báo Prisma

- -> Công việc tiếp theo là khai báo package cho
- -> Thêm @prisma/client để tương tác với cơ sở dữ liệu
- -> Tạo thêm một thư mục là `lib` bên trong tạo một file tên là prismadb.ts

- -> \*\*\*\*
- -> // Chúng ta làm điều này bởi vì Nextjs nó preloading, về cơ bản preloading nghĩa là mỗi lần code chúng ta change, update và reruns
  // Ở đây chúng tạo ra prismaClient instance, global file không ảnh hưởng đến hot reloading, trên production chúng ta không làm điều đó, chúng ta chắc chắn mthu bthuong, vì vậy hãy chắc chắn rằng bạn có mthu như này, bây giờ chúng ta sẽ đi fix cái error prismadb

- -> Tiếp theo chúng ta sẽ tạo ra file `.env` -> Tạo tài khoản trên mongodb atlas và sử dụng vs code để connecting với database của chúng -> Sau khi đã tạo xong thì chúng ta thay thế nó vào file .env mà chúng ta đã tạo
- -> Tiếp đến sẽ vào `prismadb` và viết tất cả các `model` vào bên trong -> bởi vì chúng ta cần tất cả các model và sau đó pushing tất cả chúng vào `database` của chúng ta và sau đó chỉnh sửa chúng 1 lần nữa, chúng ta có thể gây ra một số rắc rối trong `tutorial` này -> Đó là thực tế trong quy trình làm việc trong khi chúng ta đang phát triển nhưng trong video hướng dẫn tốt nhất là chúng ta nên ghi hết tất cả ra -> Và chúng ta sẽ được giải thích chi tiết về mối quan hệ giữa mỗi một trong các mode trong db
- -> Vì vậy chúng ta bắt đầu viết model đầu tiên => Tạo model `User`
  -> Trong mongodb sử dụng một loại `id` đặc biệt được gọi là objectId -> Những điều này có nghĩa là nó đang sử dụng đúng objectId `id` type -> Mà mongodb sử dụng trong `prisma orm` -> Nếu đã quen thuộc với mongodb thì ở đây sẽ quen thuộc với ta -> Bởi vì chúng ta phải viết cái này cho mọi mô hình của chúng ta(nó có khá là nhiều dòng và khá là phức tạp)

  -> email có thể có hoặc không vì chúng ta có thể đăng nhập bằng `google` hoặc là đăng nhập bằng `github` và email tạo và đăng nhập cũng phải là `unique` các email tạo sau ko được trùng lại

  -> emailVerified có dạng là DateTime và nó không bắt buộc phải có
  -> hashedPassword có thể có hoặc không
  -> createdAt sẽ có kiểu là DateTime @default(now())
  -> updatedAt sẽ có kiểu là DateTime @updatedAt(sử dụng tính năng của prisma để cập nhật thông tin của chúng ta)
  -> favoriteIds sẽ có kiểu là một mảng các String[]`Ids` -> mảng các `stringIds`,
  -> Session,Account là 2 thuộc tính được thêm vào trong `model User` -> Session[] một loạt các phiên làm việc, và Account[] cũng sẽ là một các tài khoản của chúng ta, model User sẽ có nhiều phiên làm việc hoặc là nhiều account hoạt động

- -> Tạo model tiếp theo là Account

  -> userId cũng sẽ là objectId và có type là String -> Mỗi account chỉ có một userId nên sẽ không phải là String[]
  -> Cuối cùng chúng ta muốn model Account là duy nhất nên sẽ có @@unique([provider, providerAccountId]) -> Bên trong là provider và providerAccountId

- -> Tạo model Session

- -> Tạo model VerificationTokens

- -> Tạo model Movie

> > > > > Cài đặtt thư viện NextAuth và khai báo phân quyền

- -> Thư viện `bcrypt` dùng để `credential Authentication` -> Dùng để ủy nhiệm xác thực người dùng
  -> Bcrypt là một hàm mã hóa mật khẩu được thiết kế bởi Niels Provos và David Mazières dựa trên các thuật toán mã hóa Blowfish và được giới thiệu lần đầu tại USENIX trong năm 1999
- -> Viết một thông tin đăng nhập trong file `NextAuth` -> Dùng để định danh người dùng
- -> Nên tìm hiểu và học sâu phần prismadb và bcrypt và NextAuth
- -> 2 biến môi trường NEXTAUTH_JWT_SECRET và NEXTAUTH_SECRET => Chúng ta sẽ tự khai báo cho nó

> > > > > Google và github OAuth

- -> Bây giờ vào tập tin môi trường và khai báo thêm các id và key cần thiết để có thể đăng nhập bằng google và github
- -> Trước khi thêm vào 2 biến môi trường của github và google thì chúng ta sẽ cài đặt gói package là 'next-auth/prisma-adapter' -> prismadb truyền vào tham số của `PrismaAdapter` và sử dụng nó trong chức năng ủy quyền
- -> Sau khi đã lấy được id và secret của github rồi bây giờ chúng ta sẽ tạo một cái `function onClick` để thực thi việc đăng nhập bằng github
  -> Trong hàm `signIn` của `nextauth` giá trị đầu tiên cần truyền vào là 'github' -> Giá trị đầu tiên cần chuyền vào là name là `provider` -> Nghĩa là người cung cấp là gì -> nên là ở đây chúng ta đăng nhập bằng github nên sẽ truyền vào là `github`
- -> Tương tự như github -> Đăng nhập bằng google cũng như vậy

- -> Sau khi đã đăng nhập bằng gmail và github của mình rồi thì những ng khác đăng nhập lần sau sẽ có thể tự động đăng nhập bằng tải khoản của chính họ

> > > > Bảo vệ Routing của chúng ta,

> ServerAuth tạo ra phiên đăng nhập cho người dùng thôi

- -> Khi mà login vào rồi thì chúng ta sẽ cho người dùng không được login nữa trừ khi người dùng đã login
- -> Tạo ra file `serverAuth.ts` để lấy ra phiên đăng nhập của người dùng -> truyền tham số {req} vào để lấy ra `jwt_token` phiên đăng nhập của người dùng(req param giữ jwt_token) -> jwt_token để lấy ra `phiên làm việc` được sử dụng để có được `người dùng đăng nhập`
  -> Vấn đề là `session` này không có đủ các fields trong `prismadb` -> Nhưng phiên làm việc của chúng ta tôi ko có đủ tất cả các trường -> Nên vậy đó là những điều chúng ta sử dụng `session` để lấy ra đầy đủ các trường trong `phiên làm việc`
  -> Tiếp đến kiểm tra phiên làm việc có tồn tại hay không người dùng -> Nếu không có chúng ta sẽ quăng ra lỗi -> Còn nếu có tồn tại thì chúng ta sẽ lấy ra người dùng hiện tại `currentUser`
  -> Giờ khi đã khai báo `serverAuth` -> Chúng ta sẽ sử dụng trong tất cả các api của chúng tôi -> Để kiểm tra chúng là đã đăng nhập rồi hay chưa

> Current api -> lấy ra người dùng hiện tại vừa mới đăng nhập

- -> Thật tốt chúng ta có thể lấy `currentUser` từ `serverAuth` chúng ta vừa mới tạo -> Kiểm tra người dùng có tồn tại hay không thì chúng ta đã kiểm tra trong file `serverAuth` rồi nên chúng ta không cần làm điều đó thêm trong file `currentUser`

> Tạo ra file fetcher dùng để callApi nạp giao diện người dùng

> Tạo ra file useCurrentUser để tải ra giao diện người dùng

- -> SWR là một gói package được phát triển bởi Vercel, có công dụng tìm nạp dữ liệu như là `ReactQuery` -> hiện tại chúng ta đã có swr nên không cần sử dụng Redux hay state management nào khác để tìm và nạp data nữa -> Đây là một `tính năng - feature` hay được ra mắt bởi `vercel`

> Bảo vệ các Route của chúng ta

- -> Bây giờ sẽ hướng dẫn bảo vệ các Route của chúng ta

  -> Đầu tiên chúng ta không muốn người dùng truy cập vào trang chủ khi mà họ chưa đăng nhập -> sẽ đá người dùng về trang đăng nhập, bắt họ phải đăng nhập rồi thì mới được tiến vào trang `home`
  -> Chúng ta sẽ vào trang `index.tsx` (Trang chủ chính là trang index này)
  -> Thêm chức năng không đồng bộ `getServerSideProps` để bảo vệ route của chúng ta -> Trên đây chúng ta sẽ lấy phiên làm việc của chúng tôi trên phía máy khách và chúng ta không sử dụng máy chủ `serverAuth` của mình, Chúng ta không thể sử dụng vì đây là tuyến máy khách(RouteClient) -> Do ở máy khách nên để lấy phiên làm việc thì chúng ta cần phải gọi tới method `getServerSideProps` -> Để lấy ra được `session` của user

- -> Sau khi đã bảo vệ Route người dung khi mà chưa đăng nhập -> Thì bây giờ chúng ta sẽ lấy ra currentUser để hiển thị lên UI của chúng ta

> Navbar Component

- -> Trong bài này chúng ta sẽ thưc hiện điều hướng `Navbar` cho project của chúng ta -> Thực hiện xây dựng component Navbar cho ứng dụng của chúng ta
- -> Nên sử dụng useCallback và cho denpendencies là `rỗng []` `Để nó lưu trong cache của RAM` cho cái `setAccountMenu` vì nó `memorizes` một cái function khi nhấn `onClick` gọi đến thì cái function đó sẽ thực thi -> Và khi component re-render thì cái `useCallback` nó sẽ không gọi lại nữa

> BillBoard Component
