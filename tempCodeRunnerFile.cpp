#include <iostream>
using namespace std;
class decimal
{
	private:
		int i=1,j=n,n,T4Tutorials_decimal=n,T4Tutorials_binary=0;
	public:
			int deci()
			{
				cout<<"decimal number";
				cin>>n;
			}
			int bin()
			{
				for(j=n;j>0;j=j/2)
				{
					T4Tutorials_binary=T4Tutorials_binary+(n%2)*i;
					i=i*10;
					n=n/2;
				}
				cout<<("T4Tutorials_binary=",T4Tutorials_decimal,T4Tutorials_binary);
			}
		};
		int main()
		{
			decimal A;
			A.deci();
			A.bin();
		}
